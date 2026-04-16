import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await login(data.email, data.password);
      if (res) {
        navigate('/');
      } else {
        alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!');
      }
    } catch (err) {
      alert((err && err.message) ? err.message : 'Đăng nhập thất bại.');
    }
  };

  const emailClass = errors.email ? 'form-control is-invalid' : 'form-control';
  const passClass = errors.password ? 'form-control is-invalid' : 'form-control';

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 fw-bold text-primary">Đăng Nhập</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={emailClass}
                    placeholder="name@example.com"
                    {...register('email', { required: 'Email là bắt buộc' })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Mật khẩu</label>
                  <input
                    type="password"
                    className={passClass}
                    placeholder="••••••••"
                    {...register('password', { required: 'Mật khẩu là bắt buộc' })}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>

                <button type="submit" className="btn btn-custom w-100 py-2 mt-2">
                  Đăng Nhập
                </button>
              </form>
              <div className="text-center mt-3">
                <span>Chưa có tài khoản? </span>
                <Link to="/register" className="text-decoration-none">Đăng ký ngay</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
