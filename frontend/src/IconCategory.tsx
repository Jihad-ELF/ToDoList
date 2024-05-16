import React from 'react';

interface IconCategoryProps {
    icon: React.ReactNode;
    id: number;// Define the type of the id parameter
}

const IconCategory: React.FC<IconCategoryProps> = ({ icon }) => {
    return (
        <div id='icon-container' className=" ml-2">{icon}</div>
    );
};

export default IconCategory;
