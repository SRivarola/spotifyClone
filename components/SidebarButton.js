const SidebarButton = ({children, label}) => {
  return (
    <button className='flex items-center space-x-2 hover:text-white'>
        {children}
        <p>{label}</p>
    </button>
  )
}
export default SidebarButton