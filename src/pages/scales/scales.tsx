/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Table,
  TextInput,
} from "flowbite-react";
import type { FC } from "react";
import { useState, useEffect } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiDocumentDownload,
  HiHome,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import axios from "axios";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AddScalesModal from "./addscales";
import EditScalesModal from "./editScales";
import DeleteScalesModal from "./deletescales";
const ScalesListPage: FC = function () {
  const [scales, setScales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [scalesPerPage, setScalesPerPage] = useState(4);

  useEffect(() => {
    const fetchDatas = async () => {
      const res = await axios.get('https://api.boxvlu.click/api/scales');
      setScales(res.data);
    };
    fetchDatas();
    const interval = setInterval(fetchDatas, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handlePrevPage = ()=>{
    if (currentPage >1){
      setCurrentPage(currentPage-1);
    }
  }
  const handleNextPage = () =>{
    setCurrentPage(currentPage+1)
  }
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredLocations = scales.filter((scale) =>
    scale.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current locations
  const indexOfLastScale = currentPage * scalesPerPage;
  const indexOfFirstScale = indexOfLastScale - scalesPerPage;
  const currentScales = filteredLocations.slice(
    indexOfFirstScale,
    indexOfLastScale
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Trang chủ</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/scales/list">Quy mô</Breadcrumb.Item>
              <Breadcrumb.Item>Danh sách</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Danh sách quy mô
            </h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    id="users-search"
                    name="users-search"
                    placeholder="Tìm kiếm"
                    onChange={handleSearch}
                  />
                </div>
              </form>
              <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <AddScalesModal />
              <Button color="gray">
                <div className="flex items-center gap-x-3">
                  <HiDocumentDownload className="text-xl" />
                  <span>Export</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <AllScalesTable scales={currentScales} />
            </div>
          </div>
        </div>
      </div>
      <div className="sticky right-0 bottom-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
        <div className="mb-4 flex items-center sm:mb-0">
          <button
            onClick={handlePrevPage}
            className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous page</span>
            <HiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={handleNextPage}
            className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next page</span>
            <HiChevronRight className="text-2xl" />
          </button>
        
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrevPage}
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <HiChevronLeft className="mr-1 text-base" />
            Lùi
          </button>
          <button
            onClick={handleNextPage}
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Tiếp
            <HiChevronRight className="ml-1 text-base" />
          </button>
        </div>
      </div>
      <ToastContainer />
    </NavbarSidebarLayout>
  );
};
const AllScalesTable: FC<{scales: any[]}> = function (props) {
  const { scales } = props;
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700 align-center">
        <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell>
        <Table.HeadCell className="text-center">Quy Mô</Table.HeadCell>
        <Table.HeadCell className="text-center">Ngày tạo</Table.HeadCell>
        <Table.HeadCell className="text-center">Ngày cập nhật</Table.HeadCell>
        <Table.HeadCell className="text-center">Hành động</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {scales.map(item => (
          <Table.Row key={item.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Table.Cell className="w-4 p-4">
              <div className="flex items-center">
                <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                <label htmlFor="checkbox-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </Table.Cell>
            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {item.created_at}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {item.updated_at}
            </Table.Cell>

            <Table.Cell>
              <div className="flex items-center gap-x-3 whitespace-nowrap">
                <button onClick={() => navigate(`/scales/list/edit/${item.id}`)}>
                  <EditScalesModal />
                </button>


                <Link to={`/scale/list/delete/${item.id}`}>
                  <DeleteScalesModal />
                </Link>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
export default ScalesListPage;
