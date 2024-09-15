const fetchAllClasses = async (page, offset, itemsPerPage, sortBy) => {
    const response = await fetch(`http://localhost:9000/classes?page=${page}&offset=${offset}&limit=${itemsPerPage}&sortBy=${sortBy}`);

    if (response.ok) {
        const responseData = await response.json();
        return responseData;
    }
};

export const fetchClassByClassScheduleID = async (classScheduleID) => {
    const response = await fetch(`http://localhost:9000/classes/${classScheduleID}`);
    console.log(response);
    if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    }
};

export const createClass = async (classData) => {
    const response = await fetch('http://localhost:9000/classes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(classData)
    });

    if (response.ok) {
        return await response.json();
    }
};

export const updateClassScheduleByID = async (classScheduleData) => {
    const classScheduleID = classScheduleData.class_schedule_id;
    const response = await fetch(`http://localhost:9000/classes/${classScheduleID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(classScheduleData)
    });

    if (response.ok) {
        let responseData = await response.json();
        console.log(responseData);
        return "data";
    }
};

export const deleteClassByID = async (classID) => {
    console.log(classID);
    const response = fetch(`http://localhost:9000/classes/${classID}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        return await response.json();
    }
};

export const fetchClasses = fetchAllClasses;