import { Button, NavIcon } from '../../components'

export default function TableHeader({transactions, desc, openDrawer}) {
  return (
    <div role='list' className='flex justify-between align-middle items-center border-b border-gray-200 pb-4 my-10'>
      <div className=''>
        <h5 className='text-grey-solid text-2xl font-bold'>{transactions} transactions</h5>
        <p className='text-grey-soft text-sm'>{desc}</p>
      </div>

      <div className='flex space-x-4'>
        <Button onClick={openDrawer} className='flex flex-row-reverse pl-4 pr-2 mx-2' label='Filter' type='default'>
          <NavIcon icon='expand_more' className='' />
          <p className='bg-black text-white text-xs mt-2 mx-1 px-1 w-4 h-4 rounded-full'>{transactions}</p>
        </Button>
        <Button className='flex flex-row-reverse px-2' icon={'download'} label='Export list' type='default'/>
      </div>
    </div>
  )
}
