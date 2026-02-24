import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { chain } from '../llm/gemini';

@Injectable()
export class ChatService implements OnModuleDestroy {
  /** Registro de streams ativos para cancelamento manual. */
  private readonly activeStreams = new Map<string, AbortController>();

  /**
   * Inicia um stream de IA. Cancela automaticamente qualquer stream anterior da mesma sessão.
   */
  async streamChat(prompt: string, sessionId: string) {
    this.stopStream(sessionId);

    const controller = new AbortController();
    this.activeStreams.set(sessionId, controller);

    try {
      return await chain.stream(
        prompt,
        {
          configurable: { sessionId },
          signal: controller.signal,
        }
      );
    } catch (error) {
      this.activeStreams.delete(sessionId);
      throw error;
    }
  }

  /**
   * Cancela a requisição subjacente para uma sessão específica.
   */
  stopStream(sessionId: string): void {
    const controller = this.activeStreams.get(sessionId);
    if (controller) {
      controller.abort();
      this.activeStreams.delete(sessionId);
    }
  }

  /**
   * Remove a sessão do mapa após o término natural do stream.
   */
  endActiveStream(sessionId: string): void {
    this.activeStreams.delete(sessionId);
  }

  /**
   * Limpeza automática ao desligar o servidor.
   */
  onModuleDestroy() {
    for (const [sessionId] of this.activeStreams) {
      this.stopStream(sessionId);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}