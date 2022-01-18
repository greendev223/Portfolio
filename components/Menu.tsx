import Link from 'next/link'
const Menu = () => {
  return (
    <div className='px-4 text-white text-lg rounded-l-xl'>
      <div className='text-right py-1'>
        <Link href="/about">
          <a className="hover:cursor-pointer">
            About
          </a>
        </Link>
      </div>
      <div className='text-right py-1'>
        <Link href="/portfolio">
          <a className="hover:cursor-pointer">
            Portfolio
          </a>
        </Link>
      </div>
      <div className='text-right py-1'>
        <Link href="/service">
          <a className="hover:cursor-pointer">
            Service
          </a>
        </Link>
      </div>
      <div className='text-right py-1'>
        <Link href="/contact">
          <a className="hover:cursor-pointer">
            Contact
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Menu
