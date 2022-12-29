import { Configuration, OpenAIApi } from 'openai'
import { remark } from 'remark'
import stripMarkdown from 'strip-markdown'

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function getOpenAiReply(prompt) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    temperature: 0.9, // 每次返回的答案的相似度0-1（0：每次都一样，1：每次都不一样）
    max_tokens: 4000,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [' Human:', ' AI:']
  })
  return await markdownToText(response?.data?.choices[0]?.text)
}

async function markdownToText(markdown?: string) {
  return remark()
    .use(stripMarkdown)
    .processSync(markdown ?? '')
    .toString()
}
