const filename = __dirname + '/data.todo.json';
let list: string[] = null!;

async function loadFromFile() {
  if (list !== null)
    return
  try {
    const file = Bun.file(filename);
    const content = await file.text();
    list = JSON.parse(content) as string[];
  } catch (error) {
    Bun.write(filename, "[]");
    list = [];
  }
}
//salva
async function saveToFile() {
  await Bun.write(filename, JSON.stringify(list));
}
//adiciona 
export async function addItem(item: string) {
  await loadFromFile(); // Garante que os dados estão carregados em memória
  list.push(item);      // Adiciona a nova tarefa ao array `list`
  await saveToFile();   // Salva os dados atualizados no arquivo JSON
}
//read
export async function getItems() {
  await loadFromFile(); // Garante que os dados estão carregados em memória
  return list;         // Retorna o array de tarefas
}
//update/atualiza
export async function updateItem(index: number, newItem: string) {
  await loadFromFile(); // Garante que os dados estão carregados em memória
  // Verifica se o índice é válido
  if (index < 0 || index >= list.length)
    throw new Error("Índice fora dos limites"); 
  list[index] = newItem; // Atualiza a tarefa no array `list`
  await saveToFile();    // Salva os dados atualizados no arquivo JSON
}
//remove
export async function removeItem(index: number) {
  await loadFromFile(); // Garante que os dados estão carregados em memória
  // Verifica se o índice é válido
  if (index < 0 || index >= list.length)
    throw new Error("Índice fora dos limites");
  list.splice(index, 1); // Remove a tarefa do array `list`
  await saveToFile();    // Salva os dados atualizados no arquivo JSON
}
//exporta funções para fora/ para uso externo
export default { addItem, getItems, updateItem, removeItem };