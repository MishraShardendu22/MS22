import emailjs from '@emailjs/browser'

emailjs.init(process.env.NEXT_PUBLIC_PUBLIC_ID as string)

export const SendEmail = ({
  name,
  email,
  message,
}: {
  name: string
  email: string
  message: string
}) => {
  const time = new Date().toLocaleString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
  })
  emailjs.send(process.env.NEXT_PUBLIC_SERVICE_ID as string, process.env.NEXT_PUBLIC_TEMPLATE_ID as string, {
    name: name,
    time: time,
    email: email,
    message: message,
  })
}
