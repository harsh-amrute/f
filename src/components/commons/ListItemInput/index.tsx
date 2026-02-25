import { menu, menuList, menuItem } from './styles.css';

interface ListItemInputProps {
  data: any[];
  onClickItem: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ListItemInput = ({ data, onClickItem }: ListItemInputProps) => {
  return (
    <div className={menu}>
      <div className={menuList}>
        {data?.map((item, index) => (
          <div key={index} className={menuItem} onClick={(e) => onClickItem(e)}>
            {item}
          </div>
        ))}

        {data?.length === 0 && (
          <div className={menuItem}>
            <div style={{ width: '155px' }}>No Data</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListItemInput;
