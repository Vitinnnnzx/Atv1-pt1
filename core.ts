const filename = __dirname + '/data.todo.json';
let list: string[] = null!;
//da load
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
  await loadFromFile();
  const agora = new Date();
  const data = agora.toLocaleDateString("pt-BR");
  const hora = agora.toLocaleTimeString("pt-BR");
  const itemComData = item + " [criado em " + data + " " + hora + "]";
  list.push(itemComData);
  await saveToFile();
}
//read
export async function getItems() {
  await loadFromFile();
  return list;
}
//update/atualiza
export async function updateItem(index: number, newItem: string) {
  await loadFromFile();
  if (index < 0 || index >= list.length)
    throw new Error("Índice fora dos limites"); 
  list[index] = newItem;
  await saveToFile();
}
//remove
export async function removeItem(index: number) {
  await loadFromFile();
  if (index < 0 || index >= list.length)
    throw new Error("Índice fora dos limites");
  list.splice(index, 1);
  await saveToFile();
}
//exporta funções para fora/ para uso externo
export default { addItem, getItems, updateItem, removeItem };
