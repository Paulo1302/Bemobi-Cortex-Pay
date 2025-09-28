import React from 'react';
import { User, RefreshCw } from 'lucide-react';

const CustomerProfile = ({ customerData }) => {
  if (!customerData) return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 text-center">
      <RefreshCw className="mx-auto animate-spin text-blue-500" />
      <p className="mt-2 text-sm text-gray-500">A carregar perfil do cliente...</p>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-700">
            <User className="mr-2" size={18} /> Perfil do Cliente
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div><span className="text-gray-500 block text-xs">Nome</span><span className="font-medium text-gray-800">{customerData.name}</span></div>
            <div><span className="text-gray-500 block text-xs">Último Pagto.</span><span className="font-medium text-gray-800">{customerData.lastPayment}</span></div>
            <div><span className="text-gray-500 block text-xs">Horário Médio</span><span className="font-medium text-gray-800">{customerData.avgPaymentTime}</span></div>
            <div><span className="text-gray-500 block text-xs">Próxima Fatura</span><span className="font-medium text-gray-800">R$ {customerData.nextBill?.amount.toFixed(2)}</span></div>
            <div><span className="text-gray-500 block text-xs">Histórico</span><span className="font-medium text-green-600">{customerData.paymentHistory}</span></div>
            <div><span className="text-gray-500 block text-xs">Método Preferido</span><span className="font-medium text-gray-800">{customerData.preferredMethod}</span></div>
          </div>
        </div>
        <div className="flex flex-row w-full sm:w-auto sm:flex-col space-x-4 sm:space-x-0 sm:space-y-3">
          <div className="text-center p-3 bg-green-50 rounded-lg flex-1 sm:flex-none">
            <div className="text-xl sm:text-2xl font-bold text-green-600">92%</div><div className="text-xs text-gray-600">Pontualidade</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg flex-1 sm:flex-none">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">Baixo</div><div className="text-xs text-gray-600">Risco</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
