'use cliente'

import colors from "tailwindcss/colors";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import api from "../app/axios/api"



export default function DialogForm() {

    async function dados() {
        const resposta = await api.get("/api_contato.php?funcao=get_contato_email&email=teste1@gmail.com", {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'
            },
        });
        console.log(resposta);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full bg-primary-graybtn" onClick={dados}>
                    Receber Dados
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="border-b-2 border-gray-400 py-6">
                    <DialogTitle className="mb-3 text-3xl ">Dados</DialogTitle>
                    <DialogDescription className="text-text text-1xl">
                        Informe o e-mail:
                    </DialogDescription>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Input
                            />
                        </div>
                        <Button className="px-3 bg-transparent">
                            <Search className="h-4 w-4" color={colors.zinc[900]} size={12} />
                        </Button>
                    </div>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )


}