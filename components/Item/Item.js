import ArchiveIcon from '../icons/ArchiveIcon';

const Item = ({ item, onArchiveClick }) => {
  const imageUrl = item?.image?.src || item?.top_image_url;

  let title = item.resolved_title || item.given_title || '';
  if(title.length > 30) {
    title = title.substring(0, 19) + '...';
  }

  const source = item?.domain_metadata?.name
    || (item?.resolved_url?.match(/:\/\/(?:www\.)?([\w\d]+\.\w+)/) || [])[1]
    || '';

  return (
    <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
      <a href={item?.resolved_url} target="_blank" rel="noreferrer">  
        <div
          className="hover:grow hover:shadow-lg w-full h-40 bg-cover bg-center bg-slate-200"
          style={imageUrl ? { backgroundImage: `url('${imageUrl}')` } : undefined}
        />
        <div className="pt-3 flex items-center justify-between">
          <p className="">
            {title}
          </p>

          <span onClick={onArchiveClick}>
            <ArchiveIcon color="gray-500" />
          </span>
        </div>
        <p className="pt-1 text-gray-900">
          {source}
        </p>
      </a>
    </div>
  );
};

export default Item;
