export function formatCellPhone (tel) {
  tel = tel.replace(/\D/g, '')
  tel = tel.replace(/^(\d)/, '+$1')
  tel = tel.replace(/(.{3})(\d)/, '$1($2')
  tel = tel.replace(/(.{6})(\d)/, '$1)$2')
  if (tel.length === 12) {
    tel = tel.replace(/(.{1})$/, '-$1')
  } else if (tel.length === 13) {
    tel = tel.replace(/(.{2})$/, '-$1')
  } else if (tel.length === 14) {
    tel = tel.replace(/(.{3})$/, '-$1')
  } else if (tel.length === 15) {
    tel = tel.replace(/(.{4})$/, '-$1')
  } else if (tel.length > 15) {
    tel = tel.replace(/(.{4})$/, '-$1')
  }
  return tel
}

export function formatCEP (cep) {
  return cep.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').replace(/(-\d{3})\d+?$/, '$1')
}

export function formatCPF (cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export function formatDate (date) {
  return new Date(date).toLocaleDateString('pt-Br')
}

export function getFormatedDate (currentDate) {
  return currentDate.split('/').reverse().join('-')
}
