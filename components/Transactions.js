import { appData, setAppData } from '../app.js';
export function Transactions() {
  setTimeout(window.initTransactionsDnD, 10); // Pour DnD
  return `
    <section class="section-transition visible">
      <h2 class="text-2xl font-bold mb-4">Transactions</h2>
      <button onclick="window.addTransaction()" class="mb-3 bg-orange-500 text-white px-4 py-2 rounded">+ Nouvelle Transaction</button>
      <table class="w-full bg-white rounded shadow">
        <thead><tr>
          <th>Date</th><th>Description</th><th>Catégorie</th><th>Montant</th><th>Type</th><th>Actions</th>
        </tr></thead>
        <tbody id="transactions-tbody">
          ${appData.transactions.map(t=>`
            <tr data-id="${t.id}">
              <td>${t.date}</td>
              <td>${t.description}</td>
              <td>${t.category}</td>
              <td class="${t.type==='Dépense'?'text-red-600':'text-green-600'}">${t.amount}€</td>
              <td>${t.type}</td>
              <td>
                <button onclick="window.editTransaction('${t.id}')">✏️</button>
                <button onclick="window.deleteTransaction('${t.id}')">🗑️</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  `;
}

// Drag & Drop for transactions (Sortable.js)
window.initTransactionsDnD = function() {
  const tbody = document.getElementById('transactions-tbody');
  if (tbody && window.Sortable) {
    new Sortable(tbody, {
      animation: 150,
      onEnd: function (evt) {
        if (evt.oldIndex === evt.newIndex) return;
        const arr = [...appData.transactions];
        const [moved] = arr.splice(evt.oldIndex, 1);
        arr.splice(evt.newIndex, 0, moved);
        setAppData({ transactions: arr });
      }
    });
  }
};

// Simple modal for add/edit
window.addTransaction = function() {
  const desc = prompt('Description ?');
  if (!desc) return;
  const type = prompt('Type (Revenu/Dépense) ?','Dépense');
  const amount = parseFloat(prompt('Montant ?','0'));
  const date = prompt('Date ?','2025-08-06');
  const category = prompt('Catégorie ?','Général');
  setAppData({ transactions: [...appData.transactions, {id:Date.now(),date,description:desc,amount,type,category}] });
};
window.editTransaction = function(id) {
  const t = appData.transactions.find(tr=>tr.id==id);
  if (!t) return;
  const desc = prompt('Description ?',t.description);
  if (!desc) return;
  t.description = desc;
  setAppData({ transactions: appData.transactions });
};
window.deleteTransaction = function(id) {
  if (confirm('Supprimer ?')) setAppData({ transactions: appData.transactions.filter(tr=>tr.id!=id) });
};
