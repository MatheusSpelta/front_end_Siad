import Image from "next/image";
import LogoImg from "/public/images/background.jpg";
import Form from "@/components/form";

export default function Home() {
  return (
    <section className="grid grid-cols-2 px-20 py-2 gap-3 max-h-screen">
      <div className="max-h-screen">
        <Image
          src={LogoImg}
          alt="Image de fundo"
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <Form />
      </div>
    </section>
  );
}
