import { clerkClient } from "@clerk/clerk-sdk-node";

const getAllUsersClerk = async (req, res) => {
  try {
    // Lấy danh sách người dùng từ Clerk
    const { data: userList, totalCount } =
      await clerkClient.users.getUserList();

    // Gửi danh sách người dùng và tổng số người dùng về phía client
    res.status(200).json({ users: userList, totalCount });
  } catch (error) {
    console.error("Error fetching users:", error);

    // Gửi phản hồi lỗi về phía client
    res.status(500).json({ error: "Error fetching users" });
  }
};
const getUserByIdClerk = async (req, res) => {
  try {
    const { userId } = req.params;

    // Lấy thông tin người dùng từ Clerk
    const user = await clerkClient.users.getUser(userId);

    // Gửi thông tin người dùng về phía client
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);

    // Gửi phản hồi lỗi về phía client
    res.status(500).json({ error: "Error fetching user" });
  }
};

export { getAllUsersClerk, getUserByIdClerk };
