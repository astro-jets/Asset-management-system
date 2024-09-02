"use client"
import { deleteUser } from "@/app/actions/users";
import SucessModal from "@/app/components/SuccessModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "../common/Loader";
import { ApplicationProps } from "@/types/application";
import { userProps } from "@/types/user";
import { CarProps } from "@/types/car";
import { BsCarFront, BsPersonStanding } from "react-icons/bs";
import DatePickerOne from "../FormElements/DatePicker/DatePickerOne";
import { newLesson } from "@/app/actions/Lessons";
import ErrorModal from "@/app/components/ErrorModal";

type appProp = {
  id: string, name: string, email: string
}

const CoursesTable = ({ applications, instructors, cars }: {
  applications: ApplicationProps[]; instructors: userProps[]; cars: CarProps[]
}) => {
  const [modalMsg, setModalMsg] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [showErrModal, setShowErrModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [application, setSelectedApplication] = useState<appProp>({ email: '', name: '', id: '', })
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOption2, setSelectedOption2] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleDelete = async (id: string) => {
    setLoading(true)
    const res = await deleteUser(id);
    if (res.status) {
      setShowModal(true);
    }
    setLoading(false)
  }

  const handleClick = async (application: appProp) => {
    setShowForm(!showForm)
    setSelectedApplication({ id: application.id, name: application.name, email: application.email });
  }
  const submit = async (formData: FormData) => {
    const instructor = formData.get('instructor');
    const car = formData.get('car');
    const date = formData.get('date');
    const id = application.id;
    const data = { car, date, instructor, application: id }
    const emailData = {
      name: application.name,
      email: application.email,
      url: `http://localhost:3000/lessons`
    }
    console.log(data)
    if (!car || !date || !instructor) {
      alert("All filed must be filled")
      return
    }
    const res = await newLesson(data, emailData);
    if (res) {
      setModalMsg(res.message)
      console.log("Res => ", res)
      if (res.status) { setShowModal(true); return; }
      else { setShowErrModal(true) }
    }
  }
  return (
    <>
      <SucessModal
        isOpen={showModal}
        title="Lesson created"
        message={modalMsg}
        onClose={() => {
          setShowForm(false)
          setSelectedOption('')
          setSelectedApplication({ name: '', id: '', email: '' })
          setSelectedOption2('')
          setShowModal(false);
          router.refresh();
        }}
        url=""
      />
      <ErrorModal
        isOpen={showErrModal}
        title="Error"
        message={modalMsg}
        onClose={() => {
          setShowForm(false)
          setSelectedOption('')
          setSelectedApplication({ name: '', id: '', email: '' })
          setSelectedOption2('')
          setShowErrModal(false);
          router.refresh();
        }}
        url=""
      />
      {loading && <Loader />}
      {showForm &&
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black">
              Create Lesson
            </h3>
          </div>
          <form action={submit} >
            <div className="p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black">
                  Select Car
                </label>

                <div className="relative z-20 bg-white dark:bg-form-input">
                  <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
                    <BsCarFront color="#3C50E0" size={20} />
                  </span>

                  <select
                    value={selectedOption}
                    name="car"
                    onChange={(e) => {
                      setSelectedOption(e.target.value);
                      changeTextColor();
                    }}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? "text-black" : ""
                      }`}
                  >
                    <option value="" disabled className="text-body dark:text-bodydark">
                      Select Car
                    </option>

                    {
                      cars.map(i => (
                        <option key={i._id} value={i._id} className="text-body dark:text-bodydark">
                          {i.name}: {i.status}
                        </option>
                      ))
                    }
                  </select>

                  <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black">
                  Select Instructor
                </label>

                <div className="relative z-20 bg-white dark:bg-form-input">
                  <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
                    <BsPersonStanding size={20} color="#3C50E0" />
                  </span>

                  <select
                    value={selectedOption2}
                    name="instructor"
                    onChange={(e) => {
                      setSelectedOption2(e.target.value);
                      changeTextColor();
                    }}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? "text-black" : ""
                      }`}
                  >
                    <option value="" disabled className="text-body dark:text-bodydark">
                      Select Instructor
                    </option>

                    {
                      instructors.map(i => (
                        <option key={i.id} value={i.id} className="text-body dark:text-bodydark">
                          {i.name}: {i.email}
                        </option>
                      ))
                    }
                  </select>

                  <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>


              <div className="w-full flex justify-between mb-4">
                <div className="w-[66%]">
                  <DatePickerOne />
                </div>
              </div>

              <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Create Lesson
              </button>
            </div>
          </form>
        </div>
      }
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black xl:pl-11">
                  Applicant
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black">
                  Course
                </th>

                <th className="px-4 py-4 font-medium text-black">
                  Status
                </th>

                <th className="px-4 py-4 font-medium text-black">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black">
                      {application.user.name}
                    </h5>
                    <p className="text-sm">Email: {application.user.email}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black">
                      {application.course.name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black">
                      {application.status}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      {/* View */}

                      {application.status == "approved" ? <p className=" text-red-500">Already approved</p> :
                        <button className="bg-primary rounded-lg text-white p-3"
                          onClick={() => {
                            handleClick({
                              id: application.id as string,
                              name: application.user.name,
                              email: application.user.email,
                            })
                          }}>
                          {showForm ? "close" : "Create Lesson"}
                        </button>
                      }
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CoursesTable;
