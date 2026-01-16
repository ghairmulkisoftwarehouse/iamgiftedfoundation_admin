import Heading  from '../../../components/global/Heading';
import  CategoriesTable   from '../../../components/app/categories/CategoriesTable';


const Categories = () => {
    return (
     
            <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>
              <CategoriesTable/>
              
            </div>
          
       
    )
}

export default Categories;