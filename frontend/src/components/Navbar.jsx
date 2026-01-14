import {Link} from "react-router";
import {PlusIcon} from "lucide-react";

const Navbar = () => {
  return (
      <header className='border-b border-base-content/10' data-theme='forest'>
        <div className='mx-auto max-w-6xl p-4'>
          <div className='flex items-center justify-between'>
            <Link
              to={"/"}
              className='text-3xl font-bold text-primary font-mono tracking-tight cursor-pointer'
            >
              ThinkBoard
            </Link>
            <div className='flex items-center gap-4'>
              <Link to={"/create"} className='btn btn-primary'>
                <PlusIcon className='size-5'/>
                <span>New Note</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Navbar;