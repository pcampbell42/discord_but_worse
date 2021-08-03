# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  username_id     :integer          not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  avatar          :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord

    #--------------------- Validations ---------------------
    
    validates :username, :username_id, :email, :password_digest, :session_token, :avatar, presence: true
    validates :username, :email, :session_token, uniqueness: true
    validates :password, length: { minimum: 6, allow_nil: true }


    #--------------------- After Initialize ---------------------

    after_initialize :ensure_session_token, :generate_username_id, :set_default_avatar

    def ensure_session_token
        self.session_token ||= SecureRandom::urlsafe_base64
    end

    def generate_username_id
        self.username_id = rand(1..9999)
        # Add logic for checking if [username, username_id] is taken here
    end

    def set_default_avatar
        self.avatar = "qwe" # Add a default avatar to project
    end


    #--------------------- Associations ---------------------
    #qweqwe
    

    #--------------------- User Auth Methods ---------------------

    attr_reader :password
    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def check_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom::urlsafe_base64
        self.save! 
        self.session_token
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        (user && user.check_password?(password)) ? user : nil
        # if user && user.check_password?(password)
        #     user
        # else
        #     nil
        # end
    end

end
