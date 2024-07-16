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

export default function DialogForm() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full bg-primary-graybtn">
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
                        <Button type="button">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}