// Aqui vamos ter que usar o use client, para poder mexer com estados (useState) para poder mandar uma requisição post para o formulário
'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import LogoImg from '/public/images/logo.jpg'
import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { ReactNode } from "react";
import DialogForm from "./dialig-form";


type SigninForm = z.infer<typeof handleSigninFormSchema>;

type SigninCredentials = SigninForm & {
    id_campanha: number;
    nome: string;
    telefone: string;
    email: string;
    segmento: string;
    informacao: string;
    assumir: number;
    datahora: string;
}
const handleSigninFormSchema = z.object({
    nome: z.string().min(1, 'Nome obrigatório'),
    telefone: z.string().min(10, 'Digíte um telefone válido.'),
    email: z.string().min(1, 'Email obrigatório').email('Digite um email, válido.')
})

export default function Form() {
    const { register, handleSubmit, formState: { errors } } = useForm<SigninCredentials>({
        resolver: zodResolver(handleSigninFormSchema)
    });

    async function handleSignin(data: SigninCredentials) {
        console.log(data);
    }

    return (
        // o form vamos colocar o onSubmit, para poder nos botões, assim que clicarmos nele, poder fazer a requisição enviando os dados.
        <form className="flex flex-col items-center gap-3 p-20 shadow-lg rounded-sm" onSubmit={handleSubmit(handleSignin)}>
            <div className="flex max-w-48">
                <Image
                    src={LogoImg}
                    alt="Logo"
                />
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-4">
                <div className="w-full">
                    <span>
                        Nome completo:
                    </span>
                    <Input
                        type="text"
                        placeholder="Matheus Spelta"
                        {...register("nome")}
                    />
                    {errors.nome && (
                        <span>
                            {errors.nome?.message as ReactNode}
                        </span>
                    )}
                </div>
                <div className="w-full">
                    <span>
                        Telefone:
                    </span>
                    <Input
                        type="text"
                        placeholder="(27) 0000-0000"
                        {...register('telefone')}
                    />
                    {errors.telefone && (
                        <span>
                            {errors.telefone?.message as ReactNode}
                        </span>
                    )}
                </div>
                <div className="w-full">
                    <span>
                        E-mail:
                    </span>
                    <Input
                        type="email"
                        placeholder="Matheus@email.com"
                        {...register('email')}
                    />
                    {errors.email && (
                        <span>
                            {errors.email?.message as ReactNode}
                        </span>
                    )}
                </div>
                <div className="w-full">
                    <span>
                        Segmento:
                    </span>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um segmento" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="teste1">Teste 1</SelectItem>
                            <SelectItem value="teste2">Teste 2</SelectItem>
                            <SelectItem value="teste3">Teste 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full">
                    <strong>Como podemos ajudar?</strong>
                    <Textarea />
                </div>

                <div className="flex flex-col items-center justify-center w-full gap-3">
                    <DialogForm />
                    {/* Aqui não precisa usar o onclick, pois no inicio do form, ja está com a função no onSubmit */}
                    <Button className="w-full bg-primary-bluebutton" type="submit">
                        Enviar
                    </Button>
                </div>
            </div>
        </form>
    )
}
