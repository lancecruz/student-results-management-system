const fetchAllTeachers = async () => {
    console.log("test teachers");
    const response = await fetch("http://localhost:9000/teachers");

    if (response.ok) {
        let results = await response.json();
        console.log("teachers api");
        return results;
    }
};

export const fetchTeachers = fetchAllTeachers;