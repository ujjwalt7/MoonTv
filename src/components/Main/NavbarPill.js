import Link from "next/link";

function NavbarPills({Icon,title ,link}) {
    return ( <Link href={link||'/'} className="w-full text-textWhite flex rounded-xl gap-4 px-4 py-2 font-medium items-center">
        <div className="text-2xl"><Icon /></div>
        {title}
    </Link> );
}

export default NavbarPills;