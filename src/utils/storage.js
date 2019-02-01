const sto = window.localStorage

const getSidebarStatus = () => sto.getItem('sidebarStatus')
const setSidebarStatus = item => sto.setItem('sidebarStatus', item)

export {
  getSidebarStatus, setSidebarStatus
}
