class HomeController < ApplicationController
	before_action :check_if_presset

	def index

	end

	def pressets

	end

	private
	def check_if_presset
		presset = params[:presset]
		redirect_to presset_show_path(presset) if presset
		@pressets = Presset.all
	end
end
