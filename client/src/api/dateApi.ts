import { RequestDate, ResponseDate } from "../types/ReqDate";

const createDate = async (recordData: RequestDate) => {
  try {
    const response = await fetch("http://localhost:5000/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recordData),
    })

    if (!response.ok) {
      throw new Error("Failed to create record")
    }

    return await response.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Error creating record: ${error.message}`)
  }
}

const fetchDate = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/records", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get records")
    }

    const data = await response.json()
    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Error getting records: ${error.message}`);
  }
}

const deleteDate = async (_id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/delete/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to delete record")
    }

    return await response.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Error deleting record: ${error.message}`);
  }
}

const updateDate = async (updatedData: ResponseDate) => {
  try {
    const response = await fetch(`http://localhost:5000/api/update/${updatedData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })

    if (!response.ok) {
      throw new Error("Failed to update record")
    }

    return await response.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Error updating record: ${error.message}`)
  }
}

export default {
  createDate,
  fetchDate,
  deleteDate,
  updateDate
}
