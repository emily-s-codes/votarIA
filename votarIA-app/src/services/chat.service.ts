import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private abortController: AbortController | null = null;
    private readonly API_URL = `${environment.apiUrl}/chat`;

    async streamChat(prompt: string, sessionId: string, onChunk: (chunk: string) => void): Promise<void> {
        this.abortController = new AbortController();

        try {
            const response = await fetch(`${this.API_URL}/generate-stream`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, sessionId }),
                signal: this.abortController.signal
            });

            if (!response.ok) throw new Error(`Server error: ${response.statusText}`);

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let leftover = '';
            while (reader) {
                const { value, done } = await reader.read();
                if (done) break;

                const currentChunk = leftover + decoder.decode(value, { stream: true });
                const lines = currentChunk.split('\n');

                leftover = lines.pop() || '';

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed || !trimmed.startsWith('data: ')) continue;

                    const dataContent = trimmed.replace('data: ', '');

                    try {
                        const parsed = JSON.parse(dataContent);
                        if (parsed.text) {
                            onChunk(parsed.text);
                        }
                    } catch (e) {
                        console.warn('Could not parse SSE line', trimmed);
                    }
                }
            }
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Stream stopped by user');
                await this.notifyServerAbort(sessionId);
            } else {
                throw error;
            }
        } finally {
            this.abortController = null;
        }
    }

    /**
     * Specifically notifies the backend to kill the LLM process
     */
    private async notifyServerAbort(sessionId: string): Promise<void> {
        try {
            await fetch(`${this.API_URL}/generate-stream/${sessionId}`, {
                method: 'DELETE'
            });
        } catch (e) {
            console.error('Failed to notify backend of abort', e);
        }
    }

    abort(): void {
        if (this.abortController) {
            this.abortController.abort();
        }
    }
}