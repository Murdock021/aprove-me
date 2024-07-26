import { Button } from "@/view/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/view/components/ui/dialog";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z} from "zod";

const FormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .max(30, {
            message: "Name must not be longer than 30 characters.",
        }),
        phone: z.string({
        required_error: "A date of birth is required.",
    }),
    email: z.string({
        required_error: "Please select a language.",
    }),
    document: z.string({
        required_error: "Please select a language.",
    }),
})

type FormValues = z.infer<typeof FormSchema>


export function CreateAssignorModal () {
    const {formState:{errors, isLoading},handleSubmit, register} = useForm<FormValues>({
        resolver:zodResolver(FormSchema)
    })
    function onSubmit(data:FormValues){
        console.log(data)
    }
    console.log(errors);
    
    return (
        <Dialog>
            <DialogTrigger>
                Criar Cedente
            </DialogTrigger>
                <DialogContent>
                    <h1>
                        Criar Cedente
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label>
                                Nome
                            </Label>
                            <Input{...register('name')}/>
                            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
                        </div>
                        <div>
                            <Label>
                                Email
                            </Label>
                            <Input{...register('email')}/>
                            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
                        </div>
                        <div>
                            <Label>
                                Telefone
                            </Label>
                            <Input{...register('phone')}/>
                            {errors.phone && (
              <span className="text-red-500">{errors.phone.message}</span>
            )}
                        </div>
                        <div>
                            <Label>
                                Documento
                            </Label>
                            <Input{...register('document')}/>
                            {errors.document && (
              <span className="text-red-500">{errors.document.message}</span>
            )}
                        </div>
                    <Button type='submit'>
                        Criar
                    </Button>
                    </form>
                </DialogContent>
        </Dialog>
    )
}