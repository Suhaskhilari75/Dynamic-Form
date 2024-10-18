import React from 'react'
import { useState } from 'react'
import styles from '../Form.module.css' 
const Form = () => {
    const [formData, setFormData] = useState({name:'',password:''});
    const [errors, setErrors] = useState({email:'',password:''})
    const [isSubmitted, setIsSubmitted] = useState(false)

    //validation function 
    const validate = (name, value) => {
        let error = '';
        switch (name) {
          case 'email':
            if (!value) {
              error = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(value)) {
              error = 'Email is invalid';
            }
            break;
          case 'password':
            if (!value) {
              error = 'Password is required';
            } else if (value.length < 6) {
              error = 'Password must be at least 6 characters long';
            }
            break;
          default:
            break;
        }
        return error;
      };
    
      // Handle input change with validation
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    
        // Validate input and update error state
        setErrors({
          ...errors,
          [name]: validate(name, value)
        });
    
        setIsSubmitted(false); // Reset submission state when input changes
      };
    
      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validate all fields
        const emailError = validate('email', formData.email);
        const passwordError = validate('password', formData.password);
    
        // Update errors
        setErrors({
          email: emailError,
          password: passwordError
        });
    
        // If no errors, set submission to true
        if (!emailError && !passwordError) {
          setIsSubmitted(true);
        }
      };

  return (
    <div>
    {isSubmitted && <div className={styles.successMessage}>Form submitted successfully!</div>}

    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? styles.inputError : ''}
        />
        {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
      </div>

      <div className={styles.formGroup}>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? styles.inputError : ''}
        />
        {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
      </div>

      <button type="submit" disabled={errors.email || errors.password }>
        Submit
      </button>
    </form>
  </div>
  )
}

export default Form