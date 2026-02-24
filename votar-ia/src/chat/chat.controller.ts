import { Controller, Post, Body, Res, Delete, Param, HttpStatus, HttpException } from '@nestjs/common';
import * as express from 'express';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  /**
   * Endpoint de streaming (SSE).
   */
  @Post('generate-stream')
  async generateStream(
    @Body() body: { prompt: string; sessionId: string },
    @Res() res: express.Response,
  ) {
    const { prompt, sessionId } = body;

    if (!prompt || !sessionId) {
      throw new HttpException('Prompt e sessionId são obrigatórios', HttpStatus.BAD_REQUEST);
    }

    try {
      const stream = await this.chatService.streamChat(prompt, sessionId);

      for await (const chunk of stream) {
        const text = chunk.content?.toString();
        if (text) {
          // Formato SSE: "data: {json}\n\n"
          res.write(`data: ${JSON.stringify({ text })}\n\n`);
        }
      }

      res.write("event: end\ndata: {}\n\n");
    } catch (err: any) {
      const isAborted = err.name === 'AbortError' || err.message?.includes('abort');

      if (isAborted) {
        if (!res.writableEnded) {
          res.write("event: aborted\ndata: Stream parado\n\n");
        }
      } else {
        console.error('Erro no streaming:', err);
        if (!res.writableEnded) {
          res.write(`event: error\ndata: ${JSON.stringify({ message: "Erro interno no servidor" })}\n\n`);
        }
      }
    } finally {
      this.chatService.endActiveStream(sessionId);
      res.end();
    }
  }

  /**
   * Endpoint para abortar manualmente um stream.
   */
  @Delete('generate-stream/:sessionId')
  abortStream(@Param('sessionId') sessionId: string) {
    this.chatService.stopStream(sessionId);
    return { message: `Sessão ${sessionId} interrompida.` };
  }
}