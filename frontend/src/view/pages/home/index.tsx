/* import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/view/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/view/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/view/components/ui/table';
import { Link } from 'react-router-dom';
import {
  AssignorProvider,
  useAssignor,
} from '@/servers/context/ContextProvider';
import { useEffect, useState } from 'react';
import { PayableActionsModal } from './components/actionsModal';
import { CreateAssignorModalContent } from './components/create-assignor-modal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/servers/context/AuthContext';

export function Home() {
  return (
    <AssignorProvider>
      <HomeContent />
    </AssignorProvider>
  );
}

export function HomeContent() {
  const { listAssignors, listPayables } = useAssignor();
  const { isTokenValid, logout } = useAuth();
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<'assignors' | 'payables'>(
    'assignors',
  );
  const [assignorList, setAssignorList] = useState([]);
  const [payableList, setPayableList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isTokenValid()) {
      logout();
    } else {
      fetchAssignors();
    }
  }, []);

  async function fetchAssignors() {
    setLoading(true);
    setError(null);
    try {
      const response = await listAssignors();
      setAssignorList(response || []);
    } catch (error) {
      setError('Failed to list assignors');
      console.error('Erro ao listar cedentes:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchPayables() {
    setLoading(true);
    setError(null);
    try {
      const response = await listPayables();
      setPayableList(response || []);
    } catch (error) {
      setError('Failed to list payables');
      console.error('Erro ao listar pagáveis:', error);
    } finally {
      setLoading(false);
    }
  }

  const renderTable = () => {
    if (loading) {
      return <p>Carregando...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (viewType === 'assignors') {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignorList.length > 0 ? (
              assignorList.map((assignor) => (
                <TableRow key={assignor.id}>
                  <TableCell>{assignor.name}</TableCell>
                  <TableCell>{assignor.document}</TableCell>
                  <TableCell>{assignor.email}</TableCell>
                  <TableCell>{assignor.phone}</TableCell>
                  <TableCell>
                    <CreateAssignorModalContent
                      assignorId={assignor.id}
                      hideCreateAssignor={true}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>Nenhum cedente encontrado.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
    } else if (viewType === 'payables') {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data de Emissão</TableHead>
              <TableHead>Cedente ID</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payableList.length > 0 ? (
              payableList.map((payable) => (
                <TableRow key={payable.id}>
                  <TableCell>{payable.id}</TableCell>
                  <TableCell>{payable.value}</TableCell>
                  <TableCell>{payable.emissionDate}</TableCell>
                  <TableCell>{payable.assignorId}</TableCell>
                  <TableCell>
                    <PayableActionsModal
                      payable={payable}
                      onUpdate={fetchPayables}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>Nenhum pagável encontrado.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <CreateAssignorModalContent />
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>
              Lista de {viewType === 'assignors' ? 'Cedentes' : 'Pagáveis'}
            </CardTitle>
            <CardDescription>
              Relação de {viewType === 'assignors' ? 'cedentes' : 'pagáveis'}{' '}
              cadastrados.
            </CardDescription>
          </div>
          <Button
            onClick={() => fetchAssignors()}
            asChild
            size="sm"
            className="ml-auto text-white gap-1"
          >
            <Link to="#">
              Ver Cedentes
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            onClick={() => fetchPayables()}
            asChild
            size="sm"
            className="ml-auto text-white gap-1"
          >
            <Link to="#">
              Ver Pagáveis
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>{renderTable()}</CardContent>
      </Card>
    </main>
  );
}
 */
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/view/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/view/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/view/components/ui/table';
import { Link, useNavigate } from 'react-router-dom';
import {
  AssignorProvider,
  useAssignor,
} from '@/servers/context/ContextProvider';
import { useEffect, useState } from 'react';
import { PayableActionsModal } from './components/actionsModal';
import { CreateAssignorModalContent } from './components/create-assignor-modal';
import { useAuth } from '@/servers/context/AuthContext';
import { toast } from '@/view/components/ui/use-toast';

export function Home() {
  return (
    <AssignorProvider>
      <HomeContent />
    </AssignorProvider>
  );
}

export function HomeContent() {
  const { listAssignors, listPayables } = useAssignor();
  const { logout, isTokenValid } = useAuth();
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<'assignors' | 'payables'>(
    'assignors',
  );
  const [assignorList, setAssignorList] = useState([]);
  const [payableList, setPayableList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchAssignors() {
    setViewType('assignors');
    setLoading(true);
    setError(null);
    try {
      const response = await listAssignors();
      setAssignorList(response || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchPayables() {
    setViewType('payables');
    setLoading(true);
    setError(null);
    try {
      const response = await listPayables();
      setPayableList(response || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  if (!isTokenValid()) {
    toast({
      variant: 'destructive',
      title: 'Token expirado, faça login novamente!',
    });
    setTimeout(() => {
      logout();
      navigate('/');
    }, 3000);
  }
  useEffect(() => {}, []);
  const renderTable = () => {
    if (loading) {
      return <p>Carregando...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (viewType === 'assignors') {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignorList.length > 0 ? (
              assignorList.map((assignor) => (
                <TableRow key={assignor.id}>
                  <TableCell>{assignor.name}</TableCell>
                  <TableCell>{assignor.document}</TableCell>
                  <TableCell>{assignor.email}</TableCell>
                  <TableCell>{assignor.phone}</TableCell>
                  <TableCell>
                    <CreateAssignorModalContent
                      assignorId={assignor.id}
                      hideCreateAssignor={true}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>Nenhum cedente encontrado.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
    } else if (viewType === 'payables') {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data de Emissão</TableHead>
              <TableHead>Cedente ID</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payableList.length > 0 ? (
              payableList.map((payable) => (
                <TableRow key={payable.id}>
                  <TableCell>{payable.id}</TableCell>
                  <TableCell>{payable.value}</TableCell>
                  <TableCell>{payable.emissionDate}</TableCell>
                  <TableCell>{payable.assignorId}</TableCell>
                  <TableCell>
                    <PayableActionsModal
                      payable={payable}
                      onUpdate={fetchPayables}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>Nenhum pagável encontrado.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <CreateAssignorModalContent />
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>
              Lista de {viewType === 'assignors' ? 'Cedentes' : 'Pagáveis'}
            </CardTitle>
            <CardDescription>
              Relação de {viewType === 'assignors' ? 'cedentes' : 'pagáveis'}{' '}
              cadastrados.
            </CardDescription>
          </div>
          <Button
            onClick={() => fetchAssignors()}
            asChild
            size="sm"
            className="ml-auto text-white gap-1"
          >
            <Link to="#">
              Ver Cedentes
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            onClick={() => fetchPayables()}
            asChild
            size="sm"
            className="ml-auto text-white gap-1"
          >
            <Link to="#">
              Ver Pagáveis
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>{renderTable()}</CardContent>
      </Card>
    </main>
  );
}
