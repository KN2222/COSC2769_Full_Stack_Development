export default function Profile() {
  return (
    <div class='container mt-3'>
      <div class='card p-3 text-center'>
        <div class='d-flex flex-row justify-content-center mb-3'>
          <div class='image'>
            <img
              src='https://i.imgur.com/hczKIze.jpg'
              alt=''
              class='rounded-circle'
            />
            <span>
              <i class='bx bxs-camera-plus'></i>
            </span>
          </div>
          <div class='d-flex flex-column ms-3 user-details'>
            <h4 class='mb-0'>Name</h4>
            {/* <div class='ratings'>
              <span>4.0</span> <i class='bx bx-star ms-1'></i>
            </div> */}
            <span>Customer</span>
          </div>
        </div>
        <h4>Edit Profile</h4>
        <div class='row'>
          <div class='col-md-6'>
            <div class='inputs'>
              <label>Name</label>
              <input
                class='form-control'
                type='text'
                placeholder='Name'
              />
            </div>
          </div>
          <div class='col-md-6'>
            <div class='inputs'>
              <label>Email</label>
              <input
                class='form-control'
                type='text'
                placeholder='Email'
              />
            </div>
          </div>
          <div class='col-md-6'>
            <div class='inputs'>
              <label>City</label>
              <input
                class='form-control'
                type='text'
                placeholder='City'
              />
            </div>
          </div>
          <div class='col-md-6'>
            <div class='inputs'>
              <label>Country</label>
              <input
                class='form-control'
                type='text'
                placeholder='Country'
              />
            </div>
          </div>
        </div>
        <div class='mt-3 gap-2 d-flex justify-content-end'>
          <button class='px-3 btn btn-sm btn-outline-primary'>Cancel</button>
          <button class='px-3 btn btn-sm btn-primary'>Save</button>
        </div>
      </div>
    </div>
  );
}
