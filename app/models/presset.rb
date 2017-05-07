class Presset < ApplicationRecord
	has_many :sounds

	validates :name, presence: true
end
