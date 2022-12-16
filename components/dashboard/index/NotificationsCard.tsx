import useSWR from 'swr';

type Notification = {
    id: string;
    message: string;
    markdown: boolean;
    createdAt: string;
    updatedAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const NotificationsCard = () => {
    const { data, error } = useSWR('/api/notifications/all?limit=15', fetcher);
    
    return (
      <div className="border-2 border-black p-4 rounded-md bg-white flex flex-col">
        <div className="flex flex-row justify-between border-b-2 border-black">
          <h1 className="text-2xl font-semibold">Notifications</h1>
        </div>
        {!data && !error && <div>loading...</div>}
        {data && data.length === 0 && <div>no notifications</div>}
        {error && <div>failed to load</div>}
        {data && data.length > 0 && (
          <ul>
            {data.map((notification: Notification) => (
              <li key={notification.id}>{notification.message}</li>
            ))}
          </ul>
        )}
      </div>
    );
};

export default NotificationsCard;