import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiChartPie,
  HiSearch,
  HiUsers,
  HiOutlineStar,
  HiViewGridAdd,
  HiGlobe,
  HiAcademicCap,
  HiMap,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <form className="pb-3 md:hidden">
            <TextInput
              icon={HiSearch}
              type="search"
              placeholder="Search"
              required
              size={32}
            />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                icon={HiChartPie}
                className={
                  "/home" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                <Link to='/home'>Trang Chủ</Link>
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiUsers}
                className={
                  "/users/list" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                <Link to='/users/list'>Người Dùng</Link>
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiViewGridAdd}
                className={
                  "/categories/list" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                <Link to='/categories/list'>Danh Mục</Link>
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiOutlineStar}
                className={
                  "/events/list" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                <Link to='/events/list'>Sự Kiện</Link>
              </Sidebar.Item>
              
              <Sidebar.Item
                icon={HiMap}
                className={
                  "/location/list" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                <Link to='/location/list'>Địa Điểm</Link>
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiAcademicCap}
                className={
                  "/faculties/list" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                <Link to='/faculties/list'>Khoa Ban</Link>
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiGlobe}
                className={
                  "/scales/list" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                <Link to='/scales/list'>Quy Mô</Link>
              </Sidebar.Item>

              <Sidebar.Item
                icon={HiUsers}
                className={
                  "/attendees/list" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                <Link to='/attendees/list'>Người Tham Gia</Link>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
