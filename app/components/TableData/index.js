import Image from 'next/image'

export default function TableData({data}) {
  return (
    <div role='listitem' className='flex justify-between py-3'>
      <div className='flex space-x-3'>
        <div className='w-12 h-12 bg-green-soft rounded-full text-center'>
          {data?.status === 'successful' &&<Image className='m-auto items-center pt-2' src={'../assets/call_received.svg'} width={30} height={30} alt='call_received' priority={true}  />}
        </div>
        <div className='flex-col text-left align-middle items-center'>
          <h6 className='font-normal text-sm'>{data?.metadata?.product_name}</h6>
          <p className='text-grey-soft pt-2 text-left text-xs'>{data?.metadata?.name}</p>
        </div>
      </div>

      <div className='flex-col text-right align-middle items-center'>
        <h6 className='font-bold text-sm'>USD {data?.amount}</h6>
        <p className='text-grey-soft text-xs'>{data?.date}</p>
      </div>
    </div>
  )
}