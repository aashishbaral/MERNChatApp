import { extractTime } from "../utils/Time";

type MessageProps = {
  sender?: boolean;
  text: string;
  image: string;
  createdAt: string;
};

const Message: React.FC<MessageProps> = ({
  sender,
  text,
  image,
  createdAt,
}) => (
  <div
    className={`flex flex-col ${
      sender ? "items-end" : "items-start"
    } mb-4 justify-center `}
  >
    <div className="flex justify-between items-center">
      {!sender && (
        <img src={image} className="object-cover h-8 w-8 rounded-full" />
      )}
      <div
        className={`${
          sender ? "bg-blue-400 text-white" : "bg-gray-400 text-white ml-2"
        } py-3 px-4 rounded-3xl max-w-xs`}
      >
        {text}
      </div>
      {sender && (
        <img src={image} className="object-cover h-8 w-8 rounded-full ml-2" />
      )}
    </div>
    <span className="text-xs text-black">{extractTime(createdAt)}</span>
  </div>
);

export default Message;
