import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { LinksBreadCrumb } from '../../routes/LinksBreadCrumb';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}
const CustomBreadcrumb = (id) => {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        { LinksBreadCrumb.map((item) => (
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href={item.path}
          >
            {item.Icon}
            {item.title}
          </Link>
        )
        )

        }
      </Breadcrumbs>
    </div>
  );
}

export default CustomBreadcrumb
