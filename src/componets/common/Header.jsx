

export default function DefaultHeader({title}){

    return(
              <>
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-6 py-1 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                </div>
              </>  
    );
}