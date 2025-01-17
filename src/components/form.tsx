//use cliente serve para habilitar a utilização do useState
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
import { ReactNode, useState } from "react";
import DialogForm from "./dialog-form";
import api from "@/app/axios/api";
import { toast } from "./ui/use-toast";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { error } from "console";

//Sobrescrição para utilizar um tipo expecifico de dados
type SigninForm = z.infer<typeof handleSigninFormSchema>;


//Validação de dados com Zod
const handleSigninFormSchema = z.object({
    nome: z.string().min(1, 'Nome obrigatório'),
    telefone: z.string().min(10, 'Digíte um telefone válido.'),
    email: z.string().min(1, 'Email obrigatório').email('Digite um email, válido.'),
    informacao: z.string().min(1, "Texto obrigatorio."),
    segmento: z.string(),


})

export default function Form() {
    const [segmento, setSegmento] = useState('');

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<SigninForm>({
        resolver: zodResolver(handleSigninFormSchema)
    });

    async function handleSignin(data: SigninForm) {
        await api.post("/api_addcontato.php?funcao=post_contato", {
            nome: data.nome,
            telefone: data.telefone,
            email: data.email,
            informacao: data.informacao,
            assumir: 1
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer',
                'Access-Control-Allow-Origin': '*'
            },
        }
        ).then((res) => {
            toast({
                title: "Link enviado com sucesso!",
                description: "O link foi armazenado na base de dados.",
                variant: "default"
            })


        }).catch((error) => {
            // console.log("Error on server request " + error)
            toast({
                title: "Erro inesperado!",
                description: "Não foi possivel incluir este novo link neste momento, tente mais tarde.",
                variant: "destructive"

            })


        })
        console.log(data);
    }

    function handleSegmentoChange(value: string) {
        setSegmento(value);
        setValue('segmento', value);
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
                        placeholder="Nome completo"
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
                        placeholder="email@email.com"
                        {...register('email')}
                    />
                    {errors.email && (
                        <span>
                            {errors.email?.message as ReactNode}
                        </span>
                    )}
                </div>
                <div className="w-full">
                    <span>Segmento</span>
                    <Select onValueChange={handleSegmentoChange} >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um segmento" />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectItem value="teste1">Teste 1</SelectItem>
                            <SelectItem value="teste2">Teste 2</SelectItem>
                            <SelectItem value="teste3">Teste 3</SelectItem>
                        </SelectContent>

                    </Select>
                    {errors.segmento && (
                        <span className="text-red-500">
                            {errors.segmento?.message as ReactNode}
                        </span>
                    )}
                </div>
                <div className="w-full">
                    <strong>Como podemos ajudar?</strong>
                    <Textarea
                        {...register('informacao')}
                    />
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
