export function Card({ children }) {
    return (
      <div className="p-4 border rounded-lg shadow-md bg-white">
        {children}
      </div>
    );
  }
  
  export function CardContent({ children }) {
    return <div className="text-gray-700">{children}</div>;
  }
  