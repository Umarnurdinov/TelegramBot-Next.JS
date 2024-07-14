"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./ContactTelegram.module.scss";
import axios from "axios";

interface IformTelegram {
  username: string;
  subject: string;
  description: string;
  email: string;
}

const ContactTelegram = () => {
  const { register, handleSubmit, reset } = useForm<IformTelegram>();

  const TOKEN = process.env.NEXT_PUBLIC_TG_TOKEN;
  const CHAT_ID = process.env.NEXT_PUBLIC_TG_CHAT_ID;
  console.log(TOKEN);

  const messageModel = (data: IformTelegram) => {
    let messageTG = `Username: <b>${data.username}</b>`;
    messageTG += `Subject: <b>${data.subject}</b>`;
    messageTG += `Description <b> ${data.description}</b>`;
    messageTG += `Email: <b>${data.email}</b>`;
    return messageTG;
  };
  const onSubmit: SubmitHandler<IformTelegram> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: messageModel(data),
    });
  };

  return (
    <div className={scss.ContactTelegram}>
      <div className="container">
        <div className={scss.content}>
          <h1>ContactTelegram</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="username"
              type="text"
              {...register("username", { required: true })}
            />
            <input
              placeholder="subject"
              type="text"
              {...register("subject", { required: true })}
            />
            <input
              placeholder="description"
              type="text"
              {...register("description", { required: true })}
            />
            <input
              placeholder="email"
              type="text"
              {...register("email", { required: true })}
            />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ContactTelegram;
