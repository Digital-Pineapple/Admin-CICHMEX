
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { LinksBreadCrumb } from '../../routes/LinksBreadCrumb';
import { Link } from 'react-router-dom';
const CustomBreadcrumb = ({id}) => {

  return (
      <Breadcrumbs>
        { LinksBreadCrumb.map((item) => (
          <Link
            key={item.title}
            to={`${item.path}${id}`}
          >
            {item.Icon}
            {item.title}
          </Link>
        )
        )

        }
      </Breadcrumbs>
  );
}

export default CustomBreadcrumb
