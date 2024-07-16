import Image from "next/image";
import LogoImg from "/public/images/background.jpg";
import Form from "@/components/form";

// Exportando uma função default do formulário como página principal
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
        {/* Esse component form está importando todo seu formulário, mexa no outro arquivo components/form.tsx para mexer nele */}
        <Form />
      </div>
    </section>
  );
}
