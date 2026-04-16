import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await registerUser({ fullName: data.fullName, email: data.email, password: data.password });
      if (res) {
        alert('Đăng ký thành công!');
        navigate('/login');
      } else {
        alert('Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      alert(err?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 fw-bold text-success">Đăng Ký Tài Khoản</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Họ và tên</label>
                  <input
                    type="text"
                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                    {...register('fullName', { required: 'Vui lòng nhập họ tên' })}
                  />
                  {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    {...register('email', { 
                      required: 'Email là bắt buộc',
                      pattern: { value: /^\S+@\S+$/i, message: 'Email không hợp lệ' }
                    })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Mật khẩu</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    {...register('password', { 
                      required: 'Mật khẩu là bắt buộc',
                      minLength: { value: 6, message: 'Tối thiểu 6 ký tự' }
                    })}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>

                <button type="submit" className="btn btn-success w-100 py-2 mt-2">
                  Tạo tài khoản
                </button>
              </form>
              <div className="text-center mt-3">
                <span>Đã có tài khoản? </span>
                <Link to="/login" className="text-decoration-none">Đăng nhập</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
