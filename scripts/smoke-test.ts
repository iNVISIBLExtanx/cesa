import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

async function main(): Promise<void> {
  const message = await anthropic.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: 64,
    messages: [{ role: 'user', content: 'Reply with exactly one word: ok' }],
  });
  console.log(`stop_reason: ${message.stop_reason}`);
}

main();
