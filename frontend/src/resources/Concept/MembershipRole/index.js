import RoleCreate from './RoleCreate';
import RoleEdit from './RoleEdit';
import RoleList from './RoleList';
import FavoriteBorderIcon from '@mui/icons-material/Class';

export default {
  config: {
    list: RoleList,
    create: RoleCreate,
    edit: RoleEdit,
    icon: FavoriteBorderIcon,
    options: {
      label: 'Rôle',
      parent: 'Concept'
    }
  },
  dataModel: {
    types: ['pair:MembershipRole'],
    list: {
      servers: '@default'
    },
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Rôle |||| Rôles',
      fields: {
        'pair:label': 'Titre',
        'pair:comment': 'Courte description',
        'pair:description': 'Description'
      }
    }
  }
};
