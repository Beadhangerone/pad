class User < ApplicationRecord
	before_action :authenticate_user!
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  def email_required?
    false
  end

  def email_changed?
    false
  end


  validates :username, presence: true, uniqueness: {
  message: "has already been taken" }
end
