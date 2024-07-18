import { Separator } from "@/view/components/ui/separator"
import { SidebarNav } from "./sidebar.layout"

const sidebarNavItems = [
    {
        title: "Recebível",
        href: "/examples/forms",
    },
    {
        title: "Cedente",
        href: "/examples/forms/account",
    },
]

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <>
            <div className="hidden space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Cadastrado de operações</h2>
                    <p className="text-muted-foreground">
                        Este módulo foi projetado para ser intuitivo e eficiente, facilitando o registro, atualização e consulta de todas as operações, garantindo uma visão clara e detalhada das atividades operacionais.
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </div>
        </>
    )
}